import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import food.truck.api.foodtruck.FoodItem;
import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.foodtruck.FoodTruckRepository;
import food.truck.api.foodtruck.Location;
import food.truck.api.other.JSONWrapper;
import food.truck.api.other.Preferences;
import food.truck.api.user.*;
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
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.net.URL;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

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
import org.springframework.test.web.servlet.MvcResult;
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
public class ControllerTest {
    //Taken from https://howtodoinjava.com/spring-boot2/testing/spring-boot-mockmvc-example/
    public static String jsonString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    static long userId;
    static long ownerId;
    static long truckId;

    final static String USER_EMAIL = "test_email@yahoo.com";
    final static String USER_UNAME = "test_username";
    final static String USER_PASSWORD = "test_password";

    final static String OWNER_EMAIL = "test_owner_email@yahoo.com";
    final static String OWNER_UNAME = "test_owner_username";
    final static String OWNER_PASSWORD = "test_owner_password";

    final static String TRUCK_NAME = "test_truck";
    final static String TRUCK_DESC = "test_truck_desc";
    final static String TRUCK_SCHEDULE = "test_truck_schedule";

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodTruckRepository foodTruckRepository;

    @BeforeEach
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @Order(1)
    public void signupOwner() throws Exception {
        User owner = new User();
        owner.setUserName(OWNER_UNAME);
        owner.setPassword(OWNER_PASSWORD);
        owner.setEmailAddress(OWNER_EMAIL);
        owner.setUserType("Owner");

        String userJson = jsonString(owner);
        //System.out.println("UserControllerTest: userJson is "+userJson);

        MvcResult result = mockMvc.perform(post("/api/signup")
                        .content(userJson)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Successful Signup!"))
                .andReturn();

        ownerId = userRepository.findByEmailAddress(OWNER_EMAIL).getId();
        //String id = JsonPath.read(result.getResponse().getContentAsString(), "$.id");
        //System.out.println(id);
    }

    //Add and make sure user is there
    @Test
    @Order(2)
    public void signupUser() throws Exception {
        User user = new User();
        user.setUserName(USER_UNAME);
        user.setPassword(USER_PASSWORD);
        user.setEmailAddress(USER_EMAIL);
        user.setUserType("Customer");

        String userJson = jsonString(user);
        //System.out.println("UserControllerTest: userJson is "+userJson);

        MvcResult result = mockMvc.perform(post("/api/signup")
                .content(userJson)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Successful Signup!"))
                .andReturn();

        userId = userRepository.findByEmailAddress(USER_EMAIL).getId();
        //String id = JsonPath.read(result.getResponse().getContentAsString(), "$.id");
        //System.out.println(id);
    }

    @Test
    @Order(3)
    public void loginUser() throws Exception {
        User user = new User();
        user.setEmailAddress(USER_EMAIL);
        user.setPassword(USER_PASSWORD);

        String userJson = jsonString(user);
        MvcResult result = mockMvc.perform(post("/api/login")
                        .content(userJson)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Successful Login"))
                .andReturn();
    }

    @Test
    @Order(4)
    public void modifyUser() throws Exception {
        //Change password & username
        User user = new User();
        user.setUserName(USER_UNAME+"_changed");
        user.setPassword(USER_PASSWORD+"_changed");

        String userJson = jsonString(user);
        MvcResult result = mockMvc.perform(post("/api/dashboard/modify")
                        .content(userJson)
                        .header("token",userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        User postUser = userRepository.findById(userId);
        assertEquals(USER_UNAME+"_changed",postUser.getUserName());
        assertEquals(USER_PASSWORD+"_changed",postUser.getPassword());
    }
    @Test
    @Order(5)
    @Transactional
    public void modifyUserPreferences() throws Exception {
        Preferences preferences = new Preferences();
        Location location = new Location(0F,0F);
        preferences.setRating(4);
        preferences.setPrice(10.00F);
        preferences.setDistance(9999999);
        preferences.setLocation(location);
        preferences.setFoodTypes(Arrays.asList("American"));

        String preferencesJson = jsonString(preferences);
        MvcResult result = mockMvc.perform(post("/api/dashboard/preferences")
                        .content(preferencesJson)
                        .header("token",userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        User user = userRepository.findById(userId);

        assertEquals(4,user.getRatingPreference());
        assertEquals(9999999,user.getDistancePreference());
        assertEquals(10.00F,user.getPricePreference());
        assertEquals(location,user.getLocationPreference());
        assertTrue(user.getFoodTypePreferences().contains("American"));
        //get preferences & check
        //TODO - possibly add getUserPreferences call
    }

    @Test
    @Order(6)
    public void addFoodTruck() throws Exception {
        FoodTruck foodTruck = new FoodTruck();
        foodTruck.setTruckName(TRUCK_NAME);
        foodTruck.setDescription(TRUCK_DESC);
        foodTruck.setSchedule(TRUCK_SCHEDULE);

        String foodTruckJson = jsonString(foodTruck);
        MvcResult result = mockMvc.perform(post("/api/addTruck")
                        .content(foodTruckJson)
                        .header("token",ownerId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        //NOTE - ASSUMPTION THAT ONLY THIS TRUCK'S NAME IS IN DB
        FoodTruck postFoodTruck = foodTruckRepository.findByTruckName(TRUCK_NAME);
        truckId = postFoodTruck.getTruckId();

        assertEquals(TRUCK_NAME,postFoodTruck.getTruckName());
        assertEquals(TRUCK_DESC,postFoodTruck.getDescription());
        assertEquals(TRUCK_SCHEDULE,postFoodTruck.getSchedule());
        //TODO - possibly add getFoodTruckNameWithId call
        //TODO - add way to implement check that owner is owner of this truck
    }

    @Test
    @Order(7)
    @Transactional
    public void subscribeUserToTruck() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/subscribe/"+truckId)
                        .header("userId",userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        User postUser = userRepository.findById(userId);
        assertTrue(postUser.getSubscriptions().contains(truckId));
    }

    @Test
    @Order(8)
    @Transactional
    public void unsubscribeUserToTruck() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/unsubscribe/"+truckId)
                        .header("userId",userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
        //isSubscribed()
        User postUser = userRepository.findById(userId);
        assertFalse(postUser.getSubscriptions().contains(truckId));
    }

    @Test
    @Order(9)
    @Transactional
    public void modifyFoodTruckMenuAddFoodItem() throws Exception {
        FoodItem foodItem = new FoodItem("American","Testy Taco",7.99F);
        JSONWrapper jsonWrapper = new JSONWrapper();
        jsonWrapper.setFoodItem(foodItem);
        String json = jsonString(jsonWrapper);
        MvcResult result = mockMvc.perform(post("/api/modifyTruck/menu")
                        .header("truckId",truckId)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        FoodTruck postFoodTruck = foodTruckRepository.findByTruckId(truckId);
        assertTrue(postFoodTruck.getMenu().contains(foodItem));
    }

    @Test
    @Order(10)
    @Transactional
    public void modifyFoodTruckAddRouteLocation() throws Exception {
        Location location = new Location(80.0000,-80.000);
        JSONWrapper jsonWrapper = new JSONWrapper();
        jsonWrapper.setLocation(location);
        String json = jsonString(jsonWrapper);
        MvcResult result = mockMvc.perform(post("/api/modifyTruck/route")
                        .header("truckId",truckId)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        FoodTruck postFoodTruck = foodTruckRepository.findByTruckId(truckId);
        assertTrue(postFoodTruck.getRoute().contains(location));
    }

    @Test
    @Order(11)
    @Transactional
    public void modifyFoodTruckMenuDeleteFoodItem() throws Exception {
        FoodItem foodItem = new FoodItem("American","Testy Taco",7.99F);
        //Assumption is that previously added food item is index 0 in the menu
        MvcResult result = mockMvc.perform(post("/api/modifyTruck/menu/remove/"+0)
                        .header("truckId",truckId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        FoodTruck postFoodTruck = foodTruckRepository.findByTruckId(truckId);
        assertFalse(postFoodTruck.getMenu().contains(foodItem));
    }

    @Test
    @Order(12)
    @Transactional
    public void modifyFoodTruckDeleteRouteLocation() throws Exception {
        Location location = new Location(80.0000,-80.000);
        //Assumption is that previously added location is index 0 in the route
        MvcResult result = mockMvc.perform(post("/api/modifyTruck/route/remove/"+0)
                        .header("truckId",truckId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        FoodTruck postFoodTruck = foodTruckRepository.findByTruckId(truckId);
        assertFalse(postFoodTruck.getRoute().contains(location));
    }

    @Test
    @Order(13)
    @Transactional
    public void addRatingToFoodTruck() throws Exception {
        Rating rating = new Rating(userId,4,"This truck's awesome.");
        String json = jsonString(rating);
        MvcResult result = mockMvc.perform(post("/api/modifyTruck/route/remove/"+0)
                        .header("truckID",truckId)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        //Check rating exists
    }

    //Remove test data on completion (must be last)
    @Test
    @Order(14)
    public void deleteAll() {
        userRepository.deleteById(userId);
        userRepository.deleteById(ownerId);
        foodTruckRepository.deleteById(truckId);
    }
}