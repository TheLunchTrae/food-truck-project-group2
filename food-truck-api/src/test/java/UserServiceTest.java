import com.fasterxml.jackson.databind.ObjectMapper;
import food.truck.api.user.User;
import food.truck.api.user.UserController;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


//@SpringBootTest
/*
@ExtendWith(SpringExtension.class)
//@ContextConfiguration(locations = {""})
@WebAppConfiguration
@AutoConfigureMockMvc
*/
@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(UserController.class)
public class UserServiceTest {
    private MockMvc mockMvc;

    @Autowired
    WebApplicationContext webApplicationContext;


    @BeforeEach
    public void setUp(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
    @Test
    public void signUpAccountCreationTest() throws Exception {
        User user = new User();
        user.setId(99L);
        user.setEmailAddress("myAddr");
        user.setPassword("myPs");
        user.setUserType("Customer");
        if (mockMvc == null){
            throw new Exception("MockMvc is null");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);
        System.out.println(json);
        /*
                        .param("emailAddress",user.getEmailAddress())
                .param("password",user.getPassword())
                .param("userType","Customer"))
        */
        mockMvc.perform(post("/signup")
                        .characterEncoding("utf-8")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.emailAddress").value("myAddr"))
                .andExpect(jsonPath("$.password").value("myPs"))
                .andReturn();
    }
    @Test
    public void dashboardAccountEditingTest(){}

    //TODO - fully test for subscriptions, ratings, food trucks, etc.
    @Test
    public void getUserDetails(){}
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
