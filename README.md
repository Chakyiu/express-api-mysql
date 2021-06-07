# Introduction

A simple clinic application that allows doctors to create consulation records by using `express + MySQL`.

### [API doc](https://documenter.getpostman.com/view/8236800/TzY69Zj2)

# Implementation

clone the entire project. Then run the following command:

```bash
### run in terminal
docker-compose up --build

### run in background
docker-compose up --d
```

# Unit Test

1.0 Create new Clinic account
![Demo_Img_1_0](demo/demo_img_1_0.png)

1.1 Create with repeated email
![Demo_Img_1_1](demo/demo_img_1_1.png)

1.2 Create with missing feild
![Demo_Img_1_2](demo/demo_img_1_2.png)

2.0 Login with correct email and password
![Demo_Img_2_0](demo/demo_img_2_0.png)

2.1 Login with incorrect password
![Demo_Img_2_1](demo/demo_img_2_1.png)

2.2 Login with non-existed email
![Demo_Img_2_2](demo/demo_img_2_2.png)

3.0 Login with Bearer Authentication
![Demo_Img_3_0](demo/demo_img_3_0.png)

3.1 Login without Bearer Authentication
![Demo_Img_3_1](demo/demo_img_3_1.png)

3.2 Login with incorrect Bearer Authentication
![Demo_Img_3_2](demo/demo_img_3_2.png)

4.0 Search Record with from, to, limit and offset varible with Bearer Authentication
![Demo_Img_4_0](demo/demo_img_4_0.png)

4.1 Search Record with from, to, limit and offset varible with incorrect Bearer Authentication
![Demo_Img_4_1](demo/demo_img_4_1.png)
