package com.example.gigachatb.message;


import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class MessageDTO {
    int conversationId;
    int userSendingId;
    String text;
    Timestamp sendTime;
}
