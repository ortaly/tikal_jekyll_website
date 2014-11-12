---
layout: post
title: Spring Security Authentication in Unit / Integration tests
created: 1307195312
author: ori
permalink: /java/spring-security-authentication-unit-integration-tests
tags:
- JAVA
- Spring Security Integration tests Spring TestContext Framework
---
<p>The problem (briefly) : I have a set of domain applications. These applications are managed by authorized personnel. I have to implement a sandbox approach: users (persistence) actions are supposed to be isolated from each other. I have to support the notation of optimistic locking: if two sandbox users try to update the same item, each changes are maintained in isolation and a first commit wins policy must be enforced. Finders method return subset or superset of domain object collections and authorization policies should be enforced over business components and methods.</p>
<p>&nbsp;</p>
<p>This article assumes basic knowledge of Spring Security concepts and API.</p>
<p>&nbsp;</p>
<p>First I had to think of how would a sandbox identity can be maintained and carried throughout the application. This came up very easy: since I use Spring security for ... security, I just added a sandbox identifier to authenticated Principals, which can be propagated and used by the security Context.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public class SandBoxUser extends org.springframework.security.core.userdetails.User {

    private Integer sandBox;

    public SandBoxUser
            (String username, String password, boolean enabled, Integer sandBox,
             Collection&lt;? extends org.springframework.security.core.GrantedAuthority&gt; authorities)

    {
        super(username, password, enabled, true, true, true, authorities);
        this.sandBox = sandBox;
    }

    public Integer getSandBox() {
          return sandBox;
    }

}</pre>
<p>&nbsp;</p>
<p>Fairly simple. A User class with an integer sandbox identity. I wouldn't get into details of how I've implemented the sandbox functionality in order to address the problems I've mentioned above, but briefly: I've used traditional mechanisms like AOP&nbsp;(which I'm controversial about), and Spring Security features like : @Secured, @PreAuthorize, and @PostFilter</p>
<p>&nbsp;</p>
<p>For example:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Repository
@Secured(&quot;ROLE_SB&quot;)
public class SendBoxAssetDao {
...
}</pre>
<p>&nbsp;</p>
<p>Meaning that the DAO methods can only be accessed by users who are granted the ROLE_SB role.</p>
<p>&nbsp;</p>
<p>Also:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Override
@PreAuthorize(&quot;#sandBoxAsset.sandBox == principal.sandBox&quot;)
public void persist(SandBoxAsset sandBoxAsset) {
        ...
}</pre>
<p>&nbsp;</p>
<p>Meaning that this method can only accessed once the following permission evaluates to true : the method argument sandbox property equals the predefined evaluated expression principal sandbox property. The principal is of type SandBoxUser from above. How to wire all this, we'll see in a minute.</p>
<p>&nbsp;</p>
<p>I've started the article by describing my problem. Well, I've a little bit cheated. The issues here, for those of you still following, is how to use all these authorization controls in conjunction with integration tests, where we don't have an authentication mechanism such as a login form. This is, as we shall soon see, is not complicated either.</p>
<p>&nbsp;</p>
<p>The first step is to mock a security domain for users and roles. We'll start by showing the security context (securityContext.xml) config file:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
&lt;global-method-security pre-post-annotations=&quot;enabled&quot; secured-annotations=&quot;enabled&quot;/&gt;

&lt;authentication-manager&gt;
        &lt;authentication-provider user-service-ref=&quot;userDetailsService&quot;/&gt;
&lt;/authentication-manager&gt;

&lt;beans:bean id=&quot;userDetailsService&quot; class=&quot;com.xxx.security.spring.AssetManagerUserDetailsService&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>We enable Spring security pre-post annotaions (such as @PreAuthorize) and secured annotation. This one would fit our production system as well. Next we declare the authentication manager to have a mock user detail service. Let have a look at it:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
public class AssetManagerUserDetailsService implements UserDetailsService {

    Map&lt;String, Integer&gt; users = new HashMap&lt;String, Integer&gt;(2);
    {
        users.put(&quot;ori&quot;, 0);
        users.put(&quot;ofer&quot;, 1);
    }
    HashSet&lt;GrantedAuthority&gt; roles = Sets.&lt;GrantedAuthority&gt;newHashSet(new GrantedAuthorityImpl(&quot;ROLE_SB&quot;));

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
        return new SandBoxUser(username, username, true, users.get(username), roles);
    }
}</pre>
<p>&nbsp;</p>
<p>Indeed, not a very clever one, but serves out purpose: we create a sandbox user with the Sandbox identifier we retrieve from the map, using the username itself as a key.</p>
<p>&nbsp;</p>
<p>So, now for the authentication itself. How is it done using (Spring test context) integration tests?</p>
<p>The answer, not suprisingly, is using Spring Security:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@ContextConfiguration(locations = {&quot;/securityContext.xml&quot;})
public abstract class MockSecurityIntegrationTests extends AbstractTestNGSpringContextTests {

    Map&lt;Integer, String&gt; users = new HashMap&lt;Integer, String&gt;(2);
    {
        users.put(0, &quot;ori&quot;);
        users.put(1, &quot;ofer&quot;);
    }
    HashSet&lt;GrantedAuthority&gt; roles = Sets.&lt;GrantedAuthority&gt;newHashSet(new GrantedAuthorityImpl(&quot;ROLE_SB&quot;));

   @BeforeSuite
    public void authenticate() {
        int sb = new Random().nextBoolean() ? 1 : 0;
        String name = users.get(sb);
        SandBoxUser user = new SandBoxUser(name, name, true, sb, roles);
        UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(user, user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(token);
    }
}</pre>
<p>&nbsp;</p>
<p>Again, we're using a map for mock values. Note however that the keys and values are flipped (compared to the authorization example). We create a sandbox user instance, pass it to a UsernamePasswordAuthenticationToken (which is basically a java.security.Principal) and authenticate it against security context. This is really how authentication is done. All the rest was just a sort of a preface.</p>
<p>&nbsp;</p>
<p>As a quick test we'll define an authorization dependent Spring service:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Service
public class MockRoleBaseSecurityService {
    @Secured(&quot;ROLE_SB&quot;)
    public void allowedForSandBox() {
    }

    @Secured(&quot;ROLE_NOTEXIST&quot;)
    public void disallowedForSandBox() {
    }
}</pre>
<p>&nbsp;</p>
<p>We expect our sandbox user to pass through the first method invocation and be denied for the second one.</p>
<p>A simple test case can verify it:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
public class RoleCheckIntegrationTests extends MockSecurityIntegrationTests {

    @Autowired
    MockRoleBaseSecurityService service;

    @Test
    public void allow() {
        service.allowedForSandBox();
    }

    @Test(expectedExceptions = {AccessDeniedException.class})
    public void deny() {
        service.disallowedForSandBox();
        fail(&quot;You're supposed to be unauthorized&quot;);   
    }

}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
