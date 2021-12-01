import com.fasterxml.jackson.databind.ObjectMapper;
import food.truck.api.user.User;
import food.truck.api.user.UserController;
import food.truck.api.user.UserRepository;
import food.truck.api.user.UserService;
import org.junit.Before;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.net.URL;

import food.truck.api.FoodTruckApplication;

import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = FoodTruckApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {
    //Taken from https://howtodoinjava.com/spring-boot2/testing/spring-boot-mockmvc-example/
    public static String jsonString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    //Add and make sure user is there
    @Test
    @Order(1)
    public void signupUser() throws Exception {
        User user = new User();
        user.setUserName("test_username");
        user.setPassword("test_password");
        user.setEmailAddress("test_email@yahoo.com");
        user.setUserType("Customer");

        String userJson = jsonString(user);
                //"{\"userName\": \"test_username\", \"emailAddress\": \"test_email@yahoo.com\", " +
                //"\"password\": \"test_password\",\"userType\": \"Customer\"}";
        System.out.println("UserControllerTest: userJson is "+userJson);

        mockMvc.perform(post("/api/signup")
                .content(userJson)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Successful Signup!"));
    }

    //Remove test user on completion (must be last)
    @Test
    @Order(2)
    public void deleteUser() {
        User user = userRepository.findByEmailAddress("test_email@yahoo.com");
        long userId = user.getId();
        userRepository.deleteById(userId);
        //TODO - assert equals??
    }


}
/*
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = FoodTruckApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserServiceTest {
    @LocalServerPort
    private int port;

    private URL base;
    private TestRestTemplate template;

    @Before
    public void setUp() throws Exception {
        this.base = new URL("http://localhost:" + port + "/");
        template = new TestRestTemplate();
    }

    @Test
    public void signUpAccountCreationTest(){
        //Remove user before test if exists
        User user;
        if ((user = ))

    }
    @Test
    public void dashboardAccountEditingTest(){}

    //TODO - fully test for subscriptions, ratings, food trucks, etc.
    @Test
    public void getUserDetails(){}

}
*/
