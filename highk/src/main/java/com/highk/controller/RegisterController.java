
/*
 * 
 */
package com.highk.controller;

import com.highk.model.User;  // Import User model
import com.highk.service.UserService;  // Import UserService
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RegisterController {

    private final UserService userService;

    // Constructor injection of UserService
    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    @PostMapping("/submit-registration")
    public String submitRegistration(@RequestParam String username, @RequestParam String firstname, @RequestParam String lastname, @RequestParam String email, @RequestParam String password, Model model) {
        try {
            if (userService.isUsernameTaken(username)) {
                model.addAttribute("error", "Username already exists");
                return "/register"; 
            }

            User user = new User(username, firstname, lastname, password, email);
            model.addAttribute("message", "Created User successful");
            userService.hashPassword(user); 
            model.addAttribute("message", "Added Attribute successful");
            userService.saveUser(user);

            model.addAttribute("message", "Registration successful");
            return "redirect:/";  
        } catch (Exception e) {
            model.addAttribute("error", "Registration failed: " + e.getMessage());
            return "/register";
        }
    }
}
