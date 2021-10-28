package food.truck.api.foodtruck;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.foodtruck.FoodTruck;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@Service
public class FoodTruckService {
    //@Autowired
    private FoodTruckRepository truckRepository;

    public void addFoodTruck(){}
    public void modifyFoodTruck(){}

    public Optional<FoodTruck> findUser(Long userId) {
            return truckRepository.findById(userId);
        }

}
