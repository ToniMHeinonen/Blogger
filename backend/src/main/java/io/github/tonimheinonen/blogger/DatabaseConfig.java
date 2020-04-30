package io.github.tonimheinonen.blogger;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * Handles database initialization.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@Configuration
public class DatabaseConfig {
    @Value("${spring.datasource.url}")
    private String dbUrl;

    /**
     * Initializes database with the correct url.
     * @return initialized datasource
     */
    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(dbUrl);

        // This probably fixes "WARN 7364 - Possibly consider using a shorter maxLifetime value".
        config.setMaxLifetime(30000);
        config.setMaximumPoolSize(5);

        return new HikariDataSource(config);
    }
}