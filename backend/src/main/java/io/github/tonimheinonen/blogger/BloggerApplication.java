package io.github.tonimheinonen.blogger;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BloggerApplication {

	private static Log logger = LogFactory.getLog(BloggerApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BloggerApplication.class, args);
		logger.info("Creators: Olli Ahonen & Toni Heinonen");
	}

}
