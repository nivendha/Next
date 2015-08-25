

-------------------------------- VIEW ENDPOINTS --------------------------------

---------------MILESTONE 1---------------
Login:
/login

Logout:
/logout

Signup:
/signup

Dashboard:
/dashboard (page_module)


the page_module consist of the basic layout component

1)left_aside(becomes left_slider on mobile and less wifth screen)
2)right_aside(becomes right_slider on mobile and less wifth screen)
3)top_pane (holds 2 layers of header (1 optional) reduces is height showing the primary alone on mobile while scrolling)
4)bottom_pane (holds the footer,favourites button,slides out on mobile while scrolling)
5)context_menu (comes over bottom_pane in mobile devices only)

6)main_section(holds the primary contents)


-------------------------------- API ENDPOINTS --------------------------------

All responses will have the following format:
{
  meta: {
    status: STATUS,
    message: MESSAGE
  },
  data: {
    ...
  }
}

STATUS = 0/1.
data will be null if meta.status is 0.

————————————————————————

POST /user/login

PARAMETERS:
email
password

RESPONSE:
data: {}

————————————————————————

POST /user/logout

PARAMETERS:
NONE

RESPONSE:
data: {}

————————————————————————
