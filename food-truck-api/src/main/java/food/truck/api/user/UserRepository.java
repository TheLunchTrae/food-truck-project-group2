package food.truck.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAddress(String emailAddress);
    User findByEmailAddressAndPassword(String emailAddress, String password);
    User findByUserName(String userName);
    User findById(long id);
    User findByToken(String token);

    User deleteUserById(long id);
}