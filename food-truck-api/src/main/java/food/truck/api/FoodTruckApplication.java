package food.truck.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class },
        scanBasePackages = {"food.truck.api"}
)
public class FoodTruckApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodTruckApplication.class, args);
    }
}
