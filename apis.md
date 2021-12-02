## Sign up

```POST:``` ***/api/auth/signup***
  - description
    - Used to signup the user
  - payload
    - { email }
  - resposne
    - { token, message }
  - Notes
    - Along with this an mail will be send to the email with otp in it.
    - You require this token and the OTP inorder to verify the account
      
```POST:``` ***/api/auth/signup/resend***
  - description
    - Used to resend the OTP
  - payload
    - { email }
  - resposne
    - { token, message }
  - Notes
    - Along with this an mail will be send to the email with otp in it.
    - You require this token and the OTP inorder to verify the account
      
```POST:``` ***/api/auth/signup/verify***
  - description
    - Used to verify the account
  - payload
    - { email, token, otp }
  - resposne
    - { message }

## Login

```POST:``` ***/api/auth/login***
  - description
    - Used to login into account
  - payload
    - { email }
  - resposne
    - { token, message }
  - Notes
    - Along with this an mail will be send to the email with otp in it.
    - You require this token and the OTP inorder to login

```POST:``` ***/api/auth/login/verify***
  - description
    - Used to verify login process and get token
  - payload
    - { email, token, otp }
  - resposne
    - { token, message, first_name, last_name }
  - Notes
    - You require this token as Bearer Token to use restricted APIs
      
## Account

```PUT:``` ***/api/auth/account***
  - description
    - Modify account details
  - payload
    - { email, first_name, last_name }
  - resposne
    - { message }
  - Notes
    - Only First name and last name updated
      
## Post

```POST:``` ***/api/auth/posts***
  - description
    - Post a content
  - header
    - Bearer Token
  - payload
    - { content }
  - resposne
    - { success, post: { id, content } }

```DELETE:``` ***/api/auth/posts/:post_id***
  - description
    - Delete a post
  - header
    - Bearer Token
  - params
    - post_id
  - resposne
    - { message }

```POST:``` ***/api/auth/posts/:post_id/comments***
  - description
    - Post a comment
  - header
    - Bearer Token
  - payload
    - { comment }
  - params
    - post_id
  - resposne
    - { message, comment: { id, content, post_id } }

```GET:``` ***/api/auth/posts/:post_id/comments***
  - description
    - Get all comments in a post
  - header
    - Bearer Token
  - payload
    - { comment }
  - params
    - post_id
  - resposne
    - { message, comments: [{ id, content, accout_id }] }

```DELETE:``` ***/api/auth/posts/:post_id/comments/:comment_id***
  - description
    - Delete a comment
  - header
    - Bearer Token
  - params
    - post_id
    - comment_id
  - resposne
    - { message }

```POST:``` ***/api/auth/posts/:post_id/comments***
  - description
    - Post a content
  - header
    - Bearer Token
  - payload
    - { comment }
  - params
    - post_id
  - resposne
    - { message, comment: { id, content, post_id } }

```POST:``` ***/api/auth/posts/:post_id/like***
  - description
    - Like or remove like from a post
  - header
    - Bearer Token
  - params
    - post_id
  - resposne
    - { message }

