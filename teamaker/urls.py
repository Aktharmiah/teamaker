from django.urls import path, include
from . import views

app_label = 'teamaker'
app_name = 'teamaker'

urlpatterns = [


    # path('forms/user', views.userFormSelector, 'new_user'),
    path('forms/team', views.TeamFormView.as_view(), name='team_form'),
    path('forms/member', views.UserFormView.as_view(), name='user_form'),
    
    path('forms/team/<int:pk>/', views.TeamFormUpdateView.as_view(), name='team_form'),
    path('forms/member/<int:pk>/', views.UserFormUpdateView.as_view(), name='user_form'),

    ##apis


    #get, view, put or delete a single member
    path('members/<int:pk>/', views.UserDetails.as_view(), name='members_details'),
     #get all members or create a new one
    path('members/', views.UserList.as_view(),  name='members_list'),

    #get, view, put or delete a single member
    path('teams/<int:pk>/', views.TeamDetails.as_view(), name='teams_details'),
    
    #get all members or create a new one
    path('teams/', views.TeamList.as_view(), name='teams_list'),

]
