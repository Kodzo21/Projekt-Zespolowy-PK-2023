package com.example.gigachatb.conversation;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ConversationRequest {
    List<String> participants;

}
