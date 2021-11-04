package food.truck.api.foodtruck;

import food.truck.api.foodtruck.FoodTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodTruckRepository extends JpaRepository<FoodTruck, Long> {
    FoodTruck findByTruckName(String truckName);
    FoodTruck findByTruckId(Long id);
    List<FoodTruck> findAllByOwnerId(Long id);
}