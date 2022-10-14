package uhlmann.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class UhlmannApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UhlmannApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
	}
}