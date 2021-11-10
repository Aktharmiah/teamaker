from . import models
from django.forms import ModelForm
from django import forms


class TeamsForm(ModelForm):
    class Meta:
        model = models.Teams
        fields = ['team_name', 'team_description']


class TeamMemberForm(ModelForm):

    teamChoiceQueryset = models.Teams.objects.all()

    #Here we want to get the team names dynamically from a queryset instead of a static choice list
    team = forms.ModelChoiceField(
        queryset=teamChoiceQueryset,
        required=True
    )

    class Meta:
        model = models.Team_members
        fields = ['first_name', 'surname', 'skill_level', 'team']
