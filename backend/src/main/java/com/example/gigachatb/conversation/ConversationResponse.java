package com.example.gigachatb.conversation;

import com.example.gigachatb.user.UserResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class ConversationResponse {
    int id;
    String name;
    List<UserResponse> participants;
}
