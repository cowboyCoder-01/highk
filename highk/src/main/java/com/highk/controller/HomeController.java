package com.highk.controller;

import com.highk.service.UserService;
import com.highk.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class HomeController {
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private final UserService userService;

    // Remove DatabaseService if not used
    public HomeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String index() {
        return "index";  // Return the login page
    }

    @GetMapping("/index")
    public String getMethodName() {
        return "index";
    }
    

    @PostMapping("/submit-login")
    public String submitLogin(@RequestParam String username, @RequestParam String password, Model model) {
        try {
            logger.info("Attempting login for user: {}", username);

            User user = userService.getUser(username);  // Fetch the user by username
            if (user == null) {
                model.addAttribute("error", "Username does not exist");
                return "index";  // Return to the login page with error
            }

            // Compare the hashed password
            if (userService.passwordMatches(password, user.getPassword())) {
                logger.info("Login successful for user: {}", username);
                model.addAttribute("username", username);  // Add the username to the model (optional)
                return "redirect:/dashboard";  // Redirect to the dashboard
            } else {
                model.addAttribute("error", "Incorrect password");
                return "index";  // Return to the login page with error
            }
        } catch (Exception e) {
            logger.error("Login failed for user: {}", username, e);
            model.addAttribute("error", "Login failed: " + e.getMessage());
            return "index";  // Return to the login page with error
        }
    }
    
}
