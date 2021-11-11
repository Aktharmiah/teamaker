from django.urls import path, include
from . import views

app_label = 'teamaker'
app_name = 'teamaker'

urlpatterns = [


    path('forms/user', views.userFormSelector, 'new_user'),
    path('forms/team', views.TeamFormView.as_view(), 'team_form'),
    path('forms/user', views.UserFormView.as_view(), 'user_form'),
    
    ##apis


    #get, view, put or delete a single member
    path('members/<int:pk>/', views.UserDetails.as_view()),
    
    #get all members or create a new one
    path('members/', views.UserList.as_view()),
]
