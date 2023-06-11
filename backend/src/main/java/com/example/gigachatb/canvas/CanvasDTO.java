package com.example.gigachatb.canvas;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CanvasDTO {
    int conversationId;
    String data;
}
