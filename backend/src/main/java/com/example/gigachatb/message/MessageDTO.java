package com.example.gigachatb.message;


import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class MessageDTO {
    int conversation;
    String sender;
    String receiver;
    String text;
    Timestamp sendTime;
}
