import food.truck.api.FoodTruckApplication;
import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.foodtruck.FoodTruckRepository;
import food.truck.api.user.User;
import food.truck.api.user.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

//@DataJpaTest
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = FoodTruckApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FoodTruckRepository foodTruckRepository;

    User user;
    FoodTruck foodTruck;

    private void initializeUser(){
        user = new User();
        user.setUserType("Customer");
        user.setEmailAddress("test@email.com");
        user.setUserName("testUsername");
        user.setPassword("password");
    }

    private void initializeFoodTruck(){
        foodTruck = new FoodTruck();
        foodTruck.setTruckName("truckName");
        //foodTruck.setRoute("route");
        //foodTruck.setMenu("menu");
        foodTruck.setSchedule("schedule");
        foodTruck.setDescription("description");
    }

    @BeforeEach
    public void initialize(){
        initializeUser();
        initializeFoodTruck();
    }

    @Test
    @Order(1)
    public void saveUser(){
        assertNotNull((user = userRepository.save(user)));
        assertNotNull(user.getId());
        assert(user.getId() > 0);
    }
    @Test
    @Order(2)
    public void getUser(){
        assertNotNull((user = userRepository.findByEmailAddress(user.getEmailAddress())));
        assertNotNull(user.getId());
        assert(user.getId() > 0);
    }
    @Test
    @Order(3)
    public void modifyUser(){
        assertNotNull((user = userRepository.findByEmailAddress(user.getEmailAddress())));
        user.setUserName("newUsername");
        User newUser;
        assertNotNull((newUser = userRepository.save(user)));
        assertEquals(user.getEmailAddress(),newUser.getEmailAddress());
    }

    @Test
    @Order(4)
    public void addFoodTruck(){
        assertNotNull((foodTruck = foodTruckRepository.save(foodTruck)));
        assertNotNull(foodTruck.getTruckId());
        assert(foodTruck.getTruckId() > 0);
    }
    @Test
    @Order(5)
    public void getFoodTruck(){
        assertNotNull((foodTruck = foodTruckRepository.findByTruckName(foodTruck.getTruckName())));
        assertNotNull(foodTruck.getTruckId());
        assert(foodTruck.getTruckId() > 0);
    }
    @Test
    @Order(6)
    public void modifyFoodTruck(){
        assertNotNull((foodTruck = foodTruckRepository.findByTruckName(foodTruck.getTruckName())));
        foodTruck.setTruckName("newTruckName");
        FoodTruck newFoodTruck;
        assertNotNull((newFoodTruck = foodTruckRepository.save(foodTruck)));
        assertEquals(foodTruck.getTruckName(),newFoodTruck.getTruckName());

    }

    @Test
    public void deleteFoodTruck(){}
}
