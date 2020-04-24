package io.github.tonimheinonen.blogger;

import java.util.ArrayList;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.tonimheinonen.blogger.blogposts.BlogPost;
import io.github.tonimheinonen.blogger.blogposts.BlogPostRepository;
import io.github.tonimheinonen.blogger.comments.Comment;
import io.github.tonimheinonen.blogger.comments.CommentRepository;

/**
 * Starts up the application.
 * @author Toni Heinonen
 * @author toni1.heinonen@gmail.com
 * @version 1.0
 * @since 1.0
 */
@SpringBootApplication
public class BloggerApplication implements CommandLineRunner  {

	@Autowired
	BlogPostRepository blogDatabase;
	
	@Autowired
    CommentRepository commentDatabase;

	private static Log logger = LogFactory.getLog(BloggerApplication.class);

	/**
	 * Starts the application.
	 * @param args given arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(BloggerApplication.class, args);
	}

	/**
	 * Initializes database and prints information about the app.
	 * 
	 * This will be run after the app has started.
	 * @param args given arguments
	 */
	@Override
	public void run(String... args) throws Exception {
		initializeDatabase();

		logger.info("Creators: Olli Ahonen & Toni Heinonen");

		printCurlInformation();
	}

	/**
	 * Checks whether to add default blog posts and comments to the database or not.
	 */
	private void initializeDatabase() {
		// If there are no blogposts, create couple default blog posts and comments
		if (blogDatabase.count() == 0) {
			ArrayList<BlogPost> posts = new ArrayList<>();

			posts.add(new BlogPost("Admin", "Kevät", "Oli kaunis kevätsää, mutta tosiaan, missä se talvi olikaan?"));
			posts.add(new BlogPost("Admin", "Koulu", "Minne meni koulu, vai oliko sittenkin joulu?"));
			posts.add(new BlogPost("Admin", "Projekti", "Yksi kaksi, oho niitä olikin kolme, vaiko sittenkin neljä?"));

			blogDatabase.saveAll(posts);

			ArrayList<Comment> comments = new ArrayList<>();
			comments.add(new Comment("Seppo", "Tää on paras postaus koskaan.", posts.get(0)));
			comments.add(new Comment("Matti", "Ihan surkea postaus.", posts.get(0)));
			comments.add(new Comment("Joppe", "Mikä ihmeen joulu?.", posts.get(1)));
			commentDatabase.saveAll(comments);
		}
	}

	/**
	 * Prints information about how to use the curl commands.
	 */
	private void printCurlInformation() {
		// LOGIN
		System.out.println("\nLogin information:\nusername: admin\npassword: admin");
		System.out.println("\nPOST test if logged in:\ncurl -X POST http://localhost:8080/login");

		// GET
		System.out.println("\nGET all blogs:\ncurl -X GET http://localhost:8080/blogposts");
		System.out.println("\nGET search blogs by topic or text:\ncurl -X GET http://localhost:8080/blogposts/search/{text}");
		System.out.println("\nGET blog by id:\ncurl -X GET http://localhost:8080/blogposts/{id}");
		System.out.println("\nGET comments by blog id:\ncurl -X GET http://localhost:8080/comments/{id}");
		System.out.println("\nGET search comments by blog id and text:\ncurl -X GET http://localhost:8080/comments/{id}/search/{text}");

		// POST
		System.out.println("\nPOST new blog:\ncurl -X POST -H \"Content-Type: application/json\"" +
		" -d \"{\\\"author\\\":\\\"Stephen\\\",\\\"topic\\\":\\\"Example\\\",\\\"text\\\":\\\"There was an ample wisdom" +
		" in this example...\\\"}\" http://localhost:8080/blogposts -u admin:admin");
		System.out.println("\nPOST modify blog by id:\ncurl -X POST -H \"Content-Type: application/json\"" +
		" -d \"{\\\"topic\\\":\\\"Example\\\",\\\"text\\\":\\\"There was an ample wisdom" +
		" in this example...\\\"}\" http://localhost:8080/blogposts/{id} -u admin:admin");
		System.out.println("\nPOST new comment by blog id:\ncurl -X POST -H \"Content-Type: application/json\"" +
		" -d \"{\\\"author\\\":\\\"Matthew\\\",\\\"text\\\":\\\"This comment is the best\\\"}\" http://localhost:8080/comments/{id}");
		System.out.println("\nPOST modify comment by comment id:\ncurl -X POST -H \"Content-Type: application/json\"" +
		" -d \"{\\\"text\\\":\\\"There was an ample wisdom in this example...\\\"}\" http://localhost:8080/comments/modify/{id} -u admin:admin");
		System.out.println("\nPOST like comment by comment id:\ncurl -X POST http://localhost:8080/comments/like/{id}");

		// DELETE
		System.out.println("\nDELETE blog by id:\ncurl -X DELETE http://localhost:8080/blogposts/{id} -u admin:admin");
		System.out.println("\nDELETE comment by comment id:\ncurl -X DELETE http://localhost:8080/comments/{id} -u admin:admin");

		// NOTE
		System.out.println("\nNOTE - You can also use URL to heroku backend: https://intense-mountain-19543.herokuapp.com/");
	}
}
