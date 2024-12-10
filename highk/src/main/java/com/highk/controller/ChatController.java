package com.highk.controller;

import com.highk.model.ChatMessage;  
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    // Broadcast the chatMessage to all subscribers on /topic/messages
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        return chatMessage;  // Send the received chatMessage to all users
    }
}
