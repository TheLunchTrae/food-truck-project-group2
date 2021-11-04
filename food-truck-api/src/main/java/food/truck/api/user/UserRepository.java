package food.truck.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAddress(String emailAddress);
    User findByEmailAddressAndPassword(String emailAddress, String password);
    User findById(long id);

    User deleteUserById(long id);
}