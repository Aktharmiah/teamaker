import json
from logging import makeLogRecord
from django.test import TestCase, TransactionTestCase, client, override_settings
from django.test.utils import setup_test_environment

from django.urls import reverse

from . import models
from .views import TeamSerializer

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

class MembersApiTests(TestCase):

    def setUp(self):

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
        
    #Override middleware settings, as above
    @override_settings(MIDDLEWARE=MIDDLEWARE)
    def test_addingTeam(self):
        '''
            Check if the adding a team api works
        '''

        #members_list is also the endpoint for adding
        endpoint = reverse('teamaker:members_list')+'?format=json'

        postData = {
            'team_name':'api team name',
            'team_description':'api team description'
        }

        serializedPostData = json.dumps(postData)

        res = self.client.post(endpoint, serializedPostData, content_type='application/json')


        # client.get

        #check status 200
        self.assertEqual(res.status_code, 200)


    def test_getSingleMember(self):
        '''
            Gets a single team member
        '''

        res = self.client.get(reverse('teamaker:members_details', kwargs={'pk':self.team.id})+'?format=json')
        

        print("responsetext", res.content)

        self.assertEqual(res.status_code, 200)

        #check that the email addesses match
        self.assertContains(res, self.member.email)

    def test_getTeamList(self):
        '''
            Test to check if the api returns anything at all.
        '''

        res = self.client.get(reverse('teamaker:members_list')+'?format=json')

        #check status 200
        self.assertEqual(res.status_code, 200)

        #check if the output format is json
        self.assertEqual(res.headers.get('Content-Type'), 'application/json')

        #check to see if the response if not None        
        self.assertIsNotNone(res)
    