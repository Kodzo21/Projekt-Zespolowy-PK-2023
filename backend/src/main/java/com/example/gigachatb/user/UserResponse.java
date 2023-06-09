package com.example.gigachatb.user;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponse {
    String name;
    String id;
}
