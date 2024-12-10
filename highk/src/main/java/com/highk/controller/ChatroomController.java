package com.highk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ChatroomController {

    @GetMapping("/chatroom")
    public String showChatroom(@RequestParam(value = "room", required = false, defaultValue = "General") String room, Model model) {
        // Add the room parameter to the model so it can be accessed in the view
        model.addAttribute("roomName", room);

        // Return the view name (chatroom.html) to be rendered
        return "chatroom";  // This should map to chatroom.html or a Thymeleaf template in your resources/templates folder
    }
}
