from django.contrib import admin
from django.urls import path, include
# from rest_framework import routers

# import teamaker

# from teamaker.views import TeamMembersViewSet

# # Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
# router.register(r'team_members', TeamMembersViewSet)


from teamaker import urls as teamakerUrls
from teamaker import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path('', views.index, name='home' ),
    path('admin/', admin.site.urls, name='admin'),
    path('teamaker/', include(teamakerUrls, namespace='teamaker')),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


