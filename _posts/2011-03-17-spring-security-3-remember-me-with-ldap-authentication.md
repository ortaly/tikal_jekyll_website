---
layout: post
title: Spring security 3 remember-me with LDAP authentication
created: 1300346615
author: admin
permalink: /java/spring-security-3-remember-me-ldap-authentication
tags:
- JAVA
- Spring security 3
- remember-me
- OpenLdap
- ldap
---
<p>Hi,</p>
<p>&nbsp;</p>
<p>For a client I had to implement Springs &quot;remember-me&quot; functionality.Remember me allows a user to login, then close the browser and re open it and access a secured application without the need to re-enter the login details.<br />
	<br />
	To implement the feature, I read many resources freely available on the internet such as: <a href="http://static.springsource.org/spring-security/site/docs/3.0.x/reference/remember-me.html" target="_blank">http://static.springsource.<wbr />org/spring-security/site/docs/<wbr />3.0.x/reference/remember-me.<wbr />html</a>, <a href="http://www.jeviathon.com/2009/09/spring-security-30-with-active.html" target="_blank">http://www.jeviathon.com/2009/<wbr />09/spring-security-30-with-<wbr />active.html</a>, <a href="http://jamwiki.org/wiki/en/Permissions" target="_blank">http://jamwiki.org/wiki/en/<wbr />Permissions</a>, <a href="http://code.google.com/p/zk-sample-gui/" target="_blank">http://code.google.com/p/zk-<wbr />sample-gui/</a><br />
	<br />
	The application is web enabled application with a Flex client utilizing Spring security 3.0.5 and Springs LDAP template to authenticate and authorize against an OpenLdap server.<br />
	<br />
	What started (as I wrongly assumed) as a one liner inside the applicationContext.xml file:</p>
<div>
	<pre class="brush: php;" title="code">
&lt;remember-me/&gt;
</pre>
	<div>
		<code><br />
</code></div>
</div>
<p>&nbsp;</p>
<p>Turned out to be much more involved in term of the required configuration when LDAP is involved. So here are the details of how to do that, I am assuming you got the LDAP part working (with OpenLdap, active directory or whatever) and hence will not touch that here.</p>
<p>&nbsp;</p>
<p>Step 1:</p>
<p>&nbsp;</p>
<p>Add the necessary schema definitions to the applicationContext.xml&nbsp; file.&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;
    xmlns:security=&quot;http://www.springframework.org/schema/security&quot;
    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:context=&quot;http://www.springframework.org/schema/context&quot;
    xsi:schemaLocation=&quot;http://www.springframework.org/schema/security
                        http://www.springframework.org/schema/security/spring-security-3.0.xsd
                        http://www.springframework.org/schema/beans
                        http://www.springframework.org/schema/beans/spring-beans.xsd
                        http://www.springframework.org/schema/context
                        http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;

</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 2:</p>
<p>&nbsp;</p>
<p>Add a Spring token repository (c) , this repository will enable Spring to persist a token which identifies a user that has been already logged in, and assign him with a IS_AUTHENTICATED_REMEMBERED rule, or one of a predefined rules (see below such as RULE_APPLICATION) .</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;tokenRepository&quot; class=&quot;org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl&quot;&gt;
      &lt;property name=&quot;createTableOnStartup&quot; value=&quot;false&quot; /&gt;
      &lt;property name=&quot;dataSource&quot; ref=&quot;inMemDataSource&quot;/&gt;
   &lt;/bean&gt;
</pre>
<p><br />
	You may allow Spring to create the RDBMS schema for you automatically (createTableOnStartup=true), you may inspect the DDL :</p>
<p>&nbsp;</p>
<pre class="brush: sql;" title="code">
create table persistent_logins (username varchar(64) not null, series varchar(64) primary key, token varchar(64) not null, last_used timestamp not null)
</pre>
<p><br />
	Refer to JdbcTokenRepositoryImpl.<wbr />CREATE_TABLE_SQL by yourself&nbsp; and run it, or you can opt for a read only Hibernate entity that will be used solely for the creation of the table:</p>
<pre class="brush: java;" title="code">
/**

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.hibernate.validator.NotNull;

@Entity()
@Table(name = &quot;persistent_logins&quot;)
@org.hibernate.annotations.Entity(mutable = false)
/**
 * A Hibernate class used to create the table for the &quot;remember-me&quot;
 * persistent token mechanism.
 *
 * @author skashani
 *
 */
public class PersistentLogin implements java.io.Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Column(name = &quot;username&quot;)
    private String userName;

    @Id
    @NotNull
    private String series;

    @NotNull
    private String token;

    @Column(name = &quot;last_used&quot;, columnDefinition = &quot;TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP&quot;)
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUsed;

    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(final String series) {
        this.series = series;
    }

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public Date getLastUsed() {
        return lastUsed;
    }

    public void setLastUsed(final Date lastUsed) {
        this.lastUsed = lastUsed;
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(final Object other) {
        if (!(other instanceof PersistentLogin)) {
            return false;
        }
        final PersistentLogin castOther = (PersistentLogin) other;
        return new EqualsBuilder().append(userName, castOther.userName)
                                  .append(token, castOther.token)
                                  .append(lastUsed, castOther.lastUsed)
                                  .isEquals();
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(userName).append(token).append(lastUsed).toHashCode();
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE).append(&quot;userName&quot;,
                                                                                userName)
                                                                        .append(&quot;series&quot;, series)
                                                                        .append(&quot;token&quot;, token)
                                                                        .append(&quot;lastUsed&quot;,
                                                                                lastUsed)
                                                                        .toString();
    }
}
</pre>
<p><br />
	<br />
	The dataSource inMemDataSource must be a valid Spring datasource.<br />
	<br />
	Step 3:<br />
	Add two Spring &quot;voters&quot; (please consult the full documentation for more details), namely, a role and authorization voters:<br />
	<br />
	&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;!-- Votes if any ConfigAttribute.getAttribute() starts with a prefix indicating that it is a role. The --&gt;
&lt;!-- default prefix string is ROLE_, but this may be overridden to any value. It may also be set to --&gt;
&lt;!-- empty, which means that essentially any attribute will be voted on. As described further --&gt;
&lt;!-- below, the effect of an empty prefix may not be quite desirable. --&gt;
&lt;!-- Abstains from voting if no configuration attribute commences with the role prefix. Votes to --&gt;
&lt;!-- grant access if there is an exact matching --&gt;
&lt;!-- org.springframework.security.core.GrantedAuthority to a ConfigAttribute starting with the role --&gt;
&lt;!-- prefix. Votes to deny access if there is no exact matching GrantedAuthority to a --&gt;
&lt;!-- ConfigAttribute starting with the role prefix. --&gt;
&lt;!-- An empty role prefix means that the voter will vote for every ConfigAttribute. When there are --&gt;
&lt;!-- different categories of ConfigAttributes used, this will not be optimal since the voter will be --&gt;
&lt;!-- voting for attributes which do not represent roles. However, this option may be of some use --&gt;
&lt;!-- when using pre-existing role names without a prefix, and no ability exists to prefix them with --&gt;
&lt;!-- a role prefix on reading them in, such as provided for example in --&gt;
&lt;!-- org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl. --&gt;
&lt;!-- All comparisons and prefixes are case sensitive. --&gt; 
&lt;bean id=&quot;roleVoter&quot; class=&quot;org.springframework.security.access.vote.RoleVoter&quot;
           p:rolePrefix=&quot;&quot;    /&gt;  

&lt;!-- Votes if a ConfigAttribute.getAttribute() of IS_AUTHENTICATED_FULLY or --&gt;
&lt;!-- IS_AUTHENTICATED_REMEMBERED or IS_AUTHENTICATED_ANONYMOUSLY is present. This list --&gt;
&lt;!-- is in order of most strict checking to least strict checking. --&gt;
&lt;!-- The current Authentication will be inspected to determine if the principal has a particular --&gt;
&lt;!-- level of authentication. The &quot;FULLY&quot; authenticated option means the user is authenticated --&gt;
&lt;!-- fully (i.e. --&gt;
&lt;!-- org.springframework.security.authentication.AuthenticationTrustResolver.isAnonymous--&gt;
&lt;!-- (Authentication) is false and --&gt;
&lt;!-- org.springframework.security.authentication.AuthenticationTrustResolver.isRememberMe--&gt;
&lt;!-- (Authentication) is false). The &quot;REMEMBERED&quot; will grant access if the principal was either --&gt;
&lt;!-- authenticated via remember-me OR is fully authenticated. The &quot;ANONYMOUSLY&quot; will grant --&gt;
&lt;!-- access if the principal was authenticated via remember-me, OR anonymously, OR via full --&gt;
&lt;!-- authentication. --&gt;
&lt;!-- All comparisons and prefixes are case sensitive. --&gt;
    &lt;bean id=&quot;authVoter&quot; class=&quot;org.springframework.security.access.vote.AuthenticatedVoter&quot;&gt;               
    &lt;/bean&gt;
</pre>
<p><br />
	Step 4:<br />
	You must now configure a Spring AccessDecisionManager which utilizes the two voters above, in order to determine if a user was granted the correct authority to access a resource.</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;!--    Simple concrete implementation of --&gt;
&lt;!--     org.springframework.security.access.AccessDecisionManager that uses a consensus-based --&gt;
&lt;!--     approach. --&gt;
&lt;!--    &quot;Consensus&quot; here means majority-rule (ignoring abstains) rather than unanimous agreement --&gt;
&lt;!--     (ignoring abstains). If you require unanimity, please see UnanimousBased.--&gt;
   &lt;bean id=&quot;accessDecisionManager&quot; class=&quot;org.springframework.security.access.vote.ConsensusBased&quot;&gt;
        &lt;property name=&quot;allowIfAllAbstainDecisions&quot; value=&quot;false&quot; /&gt;
        &lt;property name=&quot;decisionVoters&quot;&gt;
            &lt;list&gt;
                &lt;ref bean=&quot;roleVoter&quot;  /&gt;
                &lt;ref bean=&quot;authVoter&quot; /&gt;
            &lt;/list&gt;
        &lt;/property&gt;
    &lt;/bean&gt;
 
</pre>
<p>&nbsp; &nbsp; &nbsp; &nbsp;<br />
	Step 5:<br />
	This is the standard Spring security configuration,&nbsp; I commented the places in which setup is needed specifically for the remember-me feature.</p>
<pre class="brush: xhtml;" title="code">
&lt;!-- HTTP security configuration --&gt;
    &lt;security:http auto-config=&quot;false&quot; use-expressions=&quot;false&quot; access-decision-manager-ref=&quot;accessDecisionManager&quot;&gt;
   
&lt;!--        token-repository-ref--&gt;
&lt;!--        Configures a PersistentTokenBasedRememberMeServices but allows the use of a custom PersistentTokenRepository bean. --&gt;
&lt;!--        token-validity-seconds--&gt;
&lt;!--        Maps to the tokenValiditySeconds property of AbstractRememberMeServices. --&gt;
&lt;!--        Specifies the period in seconds for which the remember-me cookie should be valid. By --&gt;
&lt;!--        default it will be valid for 14 days. --&gt;
        &lt;security:remember-me key=&quot;_spring_security_remember_me&quot; token-validity-seconds=&quot;864000&quot; token-repository-ref=&quot;tokenRepository&quot; /&gt;

        &lt;!--  login page related urls - allow anonymous access --&gt;
        &lt;security:intercept-url pattern=&quot;/security/login.html&quot; access=&quot;IS_AUTHENTICATED_ANONYMOUSLY&quot; /&gt;                   
        &lt;security:intercept-url pattern=&quot;/admin-stuff/**&quot; access=&quot;ROLE_ADMINISTRATOR&quot; /&gt;               
        &lt;security:intercept-url pattern=&quot;/**&quot; access=&quot;IS_AUTHENTICATED_REMEMBERED, IS_AUTHENTICATED_FULLY&quot; /&gt;
                                               
        &lt;!-- login &amp; logout redirection configuration --&gt;
        &lt;security:form-login login-page=&quot;/security/login.html&quot; default-target-url=&quot;/Main.html&quot;/&gt;       
        &lt;security:anonymous /&gt;   
                                                          
        &lt;security:logout logout-success-url=&quot;/security/login.html&quot; /&gt;                                   
    &lt;/security:http&gt;

</pre>
<p><br />
	Note the reference to the accessDecisionManager defined above, it is mandatory to add it to get this feature working.</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
    &lt;security:http auto-config=&quot;false&quot; use-expressions=&quot;false&quot; access-decision-manager-ref=&quot;accessDecisionManager&quot;&gt;</pre>
<p><br />
	<br />
	LDAP configuration:<br />
	<br />
	(it is mandatory to add&nbsp; to get this feature working)</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;security:ldap-user-service id=&quot;ldapUserService&quot;
     group-search-base=&quot;${spring.ldap.groupSearchBase}&quot;
     group-role-attribute=&quot;${spring.ldap.groupRoleAttribute}&quot;
     group-search-filter=&quot;${spring.ldap.groupSearchFilter}&quot;
     user-search-base=&quot;${spring.ldap.userSearchBase}&quot;
     user-search-filter=&quot;${spring.ldap.userSearchFilter}&quot;/&gt;
    
        
    &lt;security:authentication-manager&gt;
        &lt;security:ldap-authentication-provider
            server-ref=&quot;contextSource&quot;
            group-search-base=&quot;${spring.ldap.groupSearchBase}&quot;
            user-search-base=&quot;${spring.ldap.userSearchBase}&quot;
            user-search-filter=&quot;${spring.ldap.userSearchFilter}&quot;
            group-role-attribute=&quot;${spring.ldap.groupRoleAttribute}&quot;
            group-search-filter=&quot;${spring.ldap.groupSearchFilter}&quot;
            role-prefix=&quot;${spring.ldap.rolePrefix}&quot; /&gt;
    &lt;/security:authentication-manager&gt;

    &lt;security:ldap-server id=&quot;contextSource&quot;
                        url=&quot;${spring.ldap.url}&quot;
                        port=&quot;389&quot;
                        manager-dn=&quot;${spring.ldap.managerDn}&quot;
                        manager-password=&quot;${spring.ldap.managerPassword}&quot; /&gt;

    &lt;!-- LDAP Template used to execute core LDAP functionality --&gt;
    &lt;bean id=&quot;ldapTemplate&quot; class=&quot;org.springframework.ldap.core.LdapTemplate&quot;&gt;
        &lt;constructor-arg ref=&quot;contextSource&quot; /&gt;
    &lt;/bean&gt;

    &lt;!-- LDAP Security Service --&gt;
    &lt;bean id=&quot;securityService&quot;
        class=&quot;com.xxx.LdapUserManagementServiceImpl&quot;&gt;
        &lt;constructor-arg ref=&quot;ldapTemplate&quot; /&gt;
    &lt;/bean&gt;

</pre>
<p><br />
	Step 6:<br />
	From your HTML/Flex application you must send the key to instruct Spring to use the remember-me feature:<br />
	<br />
	&nbsp;</p>
<pre class="brush: xhtml;" title="code">
      &lt;p&gt;&lt;input type=&#39;checkbox&#39; name=&#39;_spring_security_remember_me&#39;/&gt; Remember me on this computer.&lt;/p&gt;</pre>
<p><br />
	<br />
	Step 7:<br />
	Once you login and check the check box,&nbsp; a new row will be inserted for you automatically by spring into the persistent_logins table:<br />
	<br />
	&nbsp;</p>
<pre class="brush: sql;" title="code">
mysql&gt; describe persistent_logins;
+-----------+--------------+------+-----+-------------------+-----------------------------+
| Field     | Type         | Null | Key | Default           | Extra                       |
+-----------+--------------+------+-----+-------------------+-----------------------------+
| series    | varchar(255) | NO   | PRI | NULL              |                             |
| last_used | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| token     | varchar(255) | NO   |     | NULL              |                             |
| username  | varchar(255) | YES  |     | NULL              |                             |
+-----------+--------------+------+-----+-------------------+-----------------------------+
4 rows in set (0.01 sec)
</pre>
<p>&nbsp;</p>
<p>And after login:<br />
	&nbsp;</p>
<pre class="brush: sql;" title="code">
mysql&gt; select * from  persistent_logins;
+--------------------------+---------------------+--------------------------+----------+
| series                   | last_used           | token                    | username |
+--------------------------+---------------------+--------------------------+----------+
| uLbBshezy3jsMBvZxgMmuw== | 2011-03-17 09:06:54 | bGZfz2+9by+ks+ZaDH3hhQ== | shlomo   |
+--------------------------+---------------------+--------------------------+----------+
1 row in set (0.00 sec)
</pre>
<p><br />
	<br />
	If you now close the browser and re-visit the secured application, there will be no need to enter your credentials.<br />
	<br />
	Questions welcomed,<br />
	<br />
	<br />
	&nbsp;<br />
	&nbsp;</p>
