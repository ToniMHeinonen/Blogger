package io.github.tonimheinonen.blogger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
 
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    @Override
    protected void configure(HttpSecurity http) throws Exception 
    {
        http
                //HTTP Basic authentication
                .httpBasic()
                .and()
                .authorizeRequests()
                //.antMatchers(HttpMethod.GET, "/blogposts").hasRole("USER")
                //.antMatchers(HttpMethod.GET, "/blogposts/**").hasRole("USER")
                //.antMatchers(HttpMethod.GET, "/blogposts/search/**").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/login").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/blogposts").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/blogposts/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/blogposts/**").hasRole("ADMIN")
                //.antMatchers(HttpMethod.GET, "/comments/**").hasRole("USER")
                //.antMatchers(HttpMethod.GET, "/comments/**/search/**").hasRole("USER")
                //.antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER")
                //.antMatchers(HttpMethod.POST, "/comments/like/**").hasRole("USER")
                .antMatchers(HttpMethod.DELETE, "/comments/**").hasRole("ADMIN")
                .and()
                .csrf().disable()
                .formLogin().disable();
    }
  
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) 
            throws Exception 
    {
        auth.inMemoryAuthentication()
                //.withUser("user").password("{noop}password").roles("USER")
                //.and()
                .withUser("admin").password("{noop}admin").roles("USER", "ADMIN");
    }
}