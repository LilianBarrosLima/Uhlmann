package uhlmann.api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/formularios/**", "/usuarios/**").authenticated()
                .antMatchers( "/h2-console/**", "/api/auth/**", "/oauth/token","/api/test/**").permitAll()
                .antMatchers("/swagger-ui.html", "/swagger-resources/*", "*.html", "/api/v1/swagger.json").permitAll()
                .anyRequest().denyAll()
                .and().formLogin().loginPage("/login").permitAll();

    }

}