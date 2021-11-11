from . import models
from django.forms import ModelForm
from django import forms


class TeamsForm(ModelForm):
    class Meta:
        model = models.Teams
        fields = ['team_name', 'team_description']


class UserForm(ModelForm):

    #Here we want to get the team names dynamically from a queryset instead of a static choice list
    team = forms.ModelChoiceField(
        queryset= models.Teams.objects.all(),
        required=True
    )

    class Meta:
        model = models.User
        fields = ['first_name', 'last_name', 'email', 'skill_level', 'team']
