from django.http import Http404
from django.urls import reverse

from django.shortcuts import render

from django.views.generic.edit import FormView

from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from . import models_forms

from django.core.exceptions import ObjectDoesNotExist


class TeamSerializer(serializers.ModelSerializer):
    '''
        Simple model serializer to serialize data from team
    '''
    
    class Meta:
        model = models.Teams
        fields = '__all__'

class TeamMembersSerializer(serializers.ModelSerializer):
    '''
        Simple model serializer to serialize data from User model
    '''
    
    class Meta:
        model = models.User
        fields = ['first_name', 'last_name', 'email', 'skill_level', 'team']

# # ViewSets define the view behavior.
# class TeamMembersViewSet(viewsets.ModelViewSet):
    
#     queryset = models.User.objects.all()
#     serializer_class = TeamMembersSerializer

class UserDetails(APIView):
    """
        Retrieve, update or delete a single team member.
    """

    authentication_classes = [] #disables authentication
    permission_classes = [] #disables permission

    def get_queryset(self, pk):
        try:
            return models.User.objects.get(pk=pk)
        except models.User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        queryset = self.get_queryset(pk)
        serializer = TeamMembersSerializer(queryset)
        return Response(serializer.data)

    def put(self, request, pk, format=None):

        queryset = self.get_queryset(pk)
        serializer = TeamMembersSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserList(APIView):
    """
        List all snippets, or create a new team member.
    """

    authentication_classes = [] #disables authentication
    permission_classes = [] #disables permission

    def get_queryset(self):
        try:
            return models.User.objects.all()
        except models.User.DoesNotExist:
            raise Http404

    def get(self, request, format=None):

        snippets = self.get_queryset()
        serializer = TeamMembersSerializer(snippets, many=True)
        
        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = TeamMembersSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamDetails(APIView):
    """
        Retrieve, update or delete a single team member.
    """

    authentication_classes = [] #disables authentication
    permission_classes = [] #disables permission

    def get_queryset(self, pk):
        try:
            return models.User.objects.get(pk=pk)
        except models.User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        queryset = self.get_queryset(pk)
        serializer = TeamSerializer(queryset)
        return Response(serializer.data)

    def put(self, request, pk, format=None):

        queryset = self.get_queryset(pk)
        serializer = TeamSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        
        queryset = self.get_queryset(pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TeamList(APIView):
    """
        List all snippets, or create a new team member.
    """

    authentication_classes = [] #disables authentication
    permission_classes = [] #disables permission

    def get_queryset(self):
        try:
            return models.User.objects.all()
        except models.User.DoesNotExist:
            raise Http404

    def get(self, request, format=None):

        snippets = self.get_queryset()
        serializer = TeamSerializer(snippets, many=True)
        
        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = TeamSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class TeamFormView(FormView):

    form_class = models_forms.TeamsForm   
    template_name = 'teamaker/forms/teams.html'
    success_url = '#'

    # def form_valid(self, form):
    #     # This method is called when valid form data has been POSTed.
    #     # It should return an HttpResponse.
    #     form.send_email()
    #     return super().form_valid(form)


class UserFormView(FormView):

    form_class = models_forms.UserForm   
    template_name = 'teamaker/forms/members.html'
    success_url = '#'

    # def form_valid(self, form):
    #     # This method is called when valid form data has been POSTed.
    #     # It should return an HttpResponse.
    #     form.send_email()
    #     return super().form_valid(form)
        

def index(request):

    return render(request, 'index.html')


# def checkTeamExistance():

#     teamsQueryset = models.Teams.objects.all()

#     if teamsQueryset.count == 0:

#         return ObjectDoesNotExist

#     return True
