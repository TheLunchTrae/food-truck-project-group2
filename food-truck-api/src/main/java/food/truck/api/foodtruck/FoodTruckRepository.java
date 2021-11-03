package food.truck.api.foodtruck;

import food.truck.api.foodtruck.FoodTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodTruckRepository extends JpaRepository<FoodTruck, Long> {
    FoodTruck findByName(String name);
    FoodTruck findByTruckId(Long id);
}