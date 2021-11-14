import json
from logging import makeLogRecord
from django.urls import include, path, reverse
from django.test import override_settings
from django.test.utils import setup_test_environment

from rest_framework.test import APITestCase, URLPatternsTestCase

from . import models

from lmc.urls import urlpatterns

# Create your tests here.

#We will override the csrf middleware for testing purpose
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


TEST_TEAM_NAME = 'My test team'
team = None

class MembersApiTests(APITestCase, URLPatternsTestCase):

    urlpatterns = urlpatterns

    def setUp(self):
        '''
            We create a team and a member so that we can test RUD functions against them
        
        '''

        TEST_TEAM_ID =1
        #create a test team

        self.team = models.Teams.objects.create(
            team_name=TEST_TEAM_NAME,
            team_description='This is a description of the test team'
        )

        # create test user

        self.member = models.User.objects.create(

            first_name = 'John',
            last_name='Doe',
            email="johnDoe@example.com",
            team=self.team,
            skill_level=models.User.Skill_level.JUNIOR
        )


    #CREATE TESTS



    #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_team_create(self):
        '''
            Create a new team
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:teams_list')+'?format=json'

        postData = {
            'team_name':'api team name',
            'team_description':'api team description'
        }

        serializedPostData = json.dumps(postData)

        res = self.client.post(endpoint, serializedPostData, content_type='application/json')

        #check status 200
        self.assertEqual(res.status_code, 201)

    #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_create_member(self):
        '''
            Add a new team member
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:members_list')+'?format=json'

        postData = {
            'first_name':'test_first_name',
            'last_name':'test_surname',
            'email':'test@email.com',
            'team' : self.team.pk
        }

        serializedPostData = json.dumps(postData)

        res = self.client.post(endpoint, serializedPostData, content_type='application/json')

        #check status 201 - created
        self.assertEqual(res.status_code, 201)


    def test_retrieve_team_list(self):
        '''
            Retrieve a list of teams
        '''

        res = self.client.get(reverse('teamaker:teams_list')+'?format=json')

        #check status 200
        self.assertEqual(res.status_code, 200)

        #check if the output format is json
        # self.assertEqual(res.headers.get('Content-Type'), 'application/json')

        #check to see if the response if not None        
        self.assertIsNotNone(res)   



    def test_retrieve_members_list(self):
        '''
            Test to check if the api returns anything at all.
        '''

        res         = self.client.get(reverse('teamaker:members_list')+'?format=json')

        #check status 200
        self.assertEqual(res.status_code, 200)

        #check if the output format is json
        self.assertEqual(res.headers.get('Content-Type'), 'application/json')

        #check to see if the response if not None        
        self.assertIsNotNone(res)
    



    #Override middleware settings, as above
    def test_retrieve_team_details(self):
        '''
            Retrieve the team created earlier
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:teams_details', kwargs={'pk': self.team.pk})+'?format=json'

        res = self.client.get(endpoint)

        #check status 200
        self.assertEqual(res.status_code, 200)



    def test_retrieve_member_details(self):
        '''
            Gets a single team member by ensuring the email address is contained within the response
        '''

        res = self.client.get(reverse('teamaker:members_details', kwargs={'pk':self.member.id})+'?format=json')

        self.assertEqual(res.status_code, 200)

        #check that the email addesses match
        self.assertContains(res, self.member.email)



     #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_update_team(self):
        '''
            Update a team
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:teams_details', kwargs={'pk':self.team.pk})+'?format=json'

        postData = {
            'team_name':'api team name - updated',
            'team_description':'api team description - updated'
        }

        serializedPostData = json.dumps(postData)

        res = self.client.put(endpoint, serializedPostData, content_type='application/json')

        #check status 200
        self.assertEqual(res.status_code, 200)   


     #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_update_member(self):
        '''
            Update a team member
            This method needs to be BEFORE the team is deleted as it referes to the team
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:members_details', kwargs={'pk':self.member.pk})+'?format=json'

        postData = {
            'first_name':'Jhonny',
            'last_name':'Dowwey',
            'email':'test__@email.com',
            'team' : self.team.pk
        }

        serializedPostData = json.dumps(postData)

        res = self.client.put(endpoint, serializedPostData, content_type='application/json')

        #check status 200
        self.assertEqual(res.status_code, 200)   




     #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_delete_team(self):
        '''
            Delete team
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:teams_details', kwargs={'pk':self.team.pk})+'?format=json'

        res = self.client.delete(endpoint)

        #check status 200
        self.assertEqual(res.status_code, 204)   


     #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_delete_member(self):
        '''
            Delete team member
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:members_details', kwargs={'pk':self.member.pk})+'?format=json'

        res = self.client.delete(endpoint)

        #check status 200
        self.assertEqual(res.status_code, 204)   

