﻿namespace FerreMasApi.Models { 

    public class Response
    {
        public int statusCode { get; set; }
        public String message { get; set; }
        public object data { get; set; }
    }

}
