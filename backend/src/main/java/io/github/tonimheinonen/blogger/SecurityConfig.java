package io.github.tonimheinonen.blogger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
 
/**
 * Sets up HTTP Basic authentication.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    /**
     * Configures HTTP Basic authentication.
     * @param http basic authentication object
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/login").hasRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/blogposts").hasRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/blogposts/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/blogposts/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/comments/**").hasRole("ADMIN")
            .and()
            .csrf().disable()
            .formLogin().disable();
    }
  
    /**
     * Sets name and password for ADMIN role.
     * @param auth authentication manager
     * @throws Exception if authentication fails
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) 
            throws Exception {
        auth.inMemoryAuthentication()
                .withUser("admin").password("{noop}admin").roles("ADMIN");
    }
}