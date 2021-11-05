package food.truck.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class },
//        scanBasePackages = {"food.truck.api"}
//)
@SpringBootApplication
@EnableJdbcHttpSession
public class FoodTruckApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodTruckApplication.class, args);
    }
}
