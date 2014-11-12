---
layout: post
title: Implementing Spring Security remember-me service based on Persistance Token
  approach using MongoDB.
created: 1328797934
author: danny
permalink: /implementing-spring-security-remember-me-service-based-persistance-token-approach-using-mongodb
tags:
- JAVA
- Spring Security
- spring mvc
- Spring
- remember-me
- MongoDB
- Spring Security Integration tests Spring TestContext Framework
- Spring security 3
---
<p>&nbsp;One of the advanced Spring Security features is remember-me option which allows user to use single sign to system after user's his credentials has been validated and he has been authenticated by system.</p>
<p>The most secure approach to do that is to use Persistant Token approach. You can read more about it <a href="http://jaspan.com/improved_persistent_login_cookie_best_practice">here</a>.&nbsp;</p>
<p>&nbsp;</p>
<p>We can describe this approach works the following way:</p>
<p>&nbsp;</p>
<ul type="circle">
    <li>When user signs in to web application additional cookie issues besides on used for section.</li>
    <li>The login cookie contains the client username, a series identifier, and a token.</li>
    <li>When a non-logged-in user visits the site and presents a login cookie, the username, series, and token are looked up in the database.</li>
    <li>If such comnination exists in database, the user is considered authenticated. The used token is removed from the database. A new token is generated, stored in database with the username and the same series identifier, and a new login issued to the client.</li>
    <li>If the username and series are present but the tokenis incorrect, it's considered as hacking attempts and some action (account block, warning email) should to be done.</li>
</ul>
<p>&nbsp;</p>
<p>According to Spring Documentation all those tokens stored in following schema:&nbsp;</p>
<pre title="code" class="brush: java;">
create table persistent_logins (username varchar(64) not null, series varchar(64) primary key, token varchar(64) not null, last_used timestamp not null).</pre>
<p>&nbsp;</p>
<p>and the object stored there is <a href="http://static.springsource.org/spring-security/site/docs/3.1.x/apidocs/org/springframework/security/web/authentication/rememberme/PersistentRememberMeToken.html">org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken</a>.</p>
<p>We will store this object using Spring integration Services &nbsp;for MongoDb. since we don't tables in MongoDb we will store our token in rememberMeTokens collection.&nbsp;</p>
<p>&nbsp;</p>
<p>Let's create some kind of PersistentRememberMeToken CRUD:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Repository(value=&quot;persistanceTokenDao&quot;)
public class PersistanceTokenDaoImpl implements PersistanceTokenDao {

	@Autowired
	MongoTemplate mongoTemplate;

        @Override
	public void insertToken(PersistentRememberMeToken token){
        //&quot;insert into persistent_logins (username, series, token, last_used) values(?,?,?,?)&quot;;
		this.mongoTemplate.insert(token, &quot;rememberMeTokens&quot;);
	}
	
	@Override
	public void updateToken(String series, String tokenValue, Date lastUsed){	
	// &quot;update persistent_logins set token = ?, last_used = ? where series = ?&quot;;
		Update update= new Update();
		update.set(&quot;tokenValue&quot;, tokenValue);
		update.set(&quot;date&quot;,lastUsed);
		Query query = new Query();
		query.addCriteria(Criteria.where(&quot;series&quot;).is(series));
		this.mongoTemplate.updateFirst(query, update, &quot;rememberMeTokens&quot;);
	}
	
	@Override
	public void deleteToken(String username){
	//&quot;delete from persistent_logins where username = ?&quot;;
	   this.mongoTemplate.remove( new Query(Criteria.where(&quot;username&quot;).is(username)),&quot;rememberMeTokens&quot;);
	}
	
	@Override
	public PersistentRememberMeToken getTokenForSeries(String seriesId){
	//&quot;select username,series,token,last_used from persistent_logins where series = ?&quot;;
		PersistentRememberMeToken token = this.mongoTemplate.findOne(new Query(Criteria.where(&quot;series&quot;).is(seriesId)), PersistentRememberMeToken.class, &quot;rememberMeTokens&quot;);
	return token;
	}
}<br /></pre>
<p>&nbsp;</p>
<p>Spring Security class which is responsible on CRUD operations is <a href="http://static.springsource.org/spring-security/site/docs/3.1.x/apidocs/org/springframework/security/web/authentication/rememberme/JdbcTokenRepositoryImpl.html">org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl</a></p>
<p>this class implements <a href="http://static.springsource.org/spring-security/site/docs/3.1.x/apidocs/org/springframework/security/web/authentication/rememberme/PersistentTokenRepository.html">PersistentTokenRepository</a> and this class makes no more then CRUD operation on token. So what we will do is just create our own class which implements this interface:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
@Component(value=&quot;mongoDBTokenRepository&quot;)
public class MongoDBTokenRepository implements PersistentTokenRepository {

	@Autowired
	PersistanceTokenDao persistanceTokenDao;
	
	@Override
	public void createNewToken(PersistentRememberMeToken token) {
		persistanceTokenDao.insertToken(token);
	}

	@Override
	public PersistentRememberMeToken getTokenForSeries(String seriesId) {
		return persistanceTokenDao.getTokenForSeries(seriesId);
	}

	@Override
	public void removeUserTokens(String username) {
		persistanceTokenDao.deleteToken(username);
	}

	@Override
	public void updateToken(String series, String tokenValue, Date lastUsed) {
		persistanceTokenDao.updateToken(series, tokenValue, lastUsed);
	}
} </pre>
<p>&nbsp;</p>
<p>Well. On this stage all our customizations are done and we will continue according to Spring Security documentation.</p>
<div>&nbsp;</div>
<pre title="code" class="brush: xhtml;">
&lt;security:http&gt;
    &lt;security:remember-me services-ref=&quot;rememberMeServices&quot; key=&quot;myRememberMeKey&quot; /&gt;
&lt;/security:http&gt;

&lt;bean id=&quot;rememberMeServices&quot; class=&quot;org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices&quot;&gt;
      &lt;property name=&quot;tokenRepository&quot; ref=&quot;mongoDBTokenRepository&quot; /&gt;
      &lt;property name=&quot;userDetailsService&quot; ref=&quot;userDetailsService&quot; /&gt;
      &lt;property name=&quot;key&quot; value=&quot;myRememberMeKey&quot; /&gt;
      &lt;property name=&quot;alwaysRemember&quot; value=&quot;true&quot; /&gt;
&lt;/bean&gt;</pre>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Notice, that we are injection our mongoDBTokenRepository bean into remeberMeServices bean using setter injection named tokenRepository.</div>
<div>now if we login (for example with my credentials danny/somepassword) and will query out token collection in mongoDB we would see out token in database:</div>
<div>&nbsp;</div>
<pre title="code" class="brush: java;">
mongos&gt; db.rememberMeTokens.find();
{ &quot;_id&quot; : ObjectId(&quot;4f2f0c2d44ae01e3e77b953f&quot;), &quot;_class&quot; : &quot;org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken&quot;, &quot;username&quot; : &quot;danny&quot;, &quot;series&quot; : &quot;j7tbXwSONKqYhBGRRM9blw==&quot;, &quot;tokenValue&quot; : &quot;D0L2ntuUTzpndPR6Mj+15w==&quot;, &quot;date&quot; : ISODate(&quot;2012-02-09T23:09:33.145Z&quot;) }
</pre>
<div>&nbsp;</div>
<div>Using this approach we can keep our tokens in any database no matter if they are relational or not. We just need to implement PersistantTokenRepository interface and inject custom DAO service.&nbsp;</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
