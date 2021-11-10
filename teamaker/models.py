
#abstract base class
from abc import ABC
from django.db import models
from django.db.models.deletion import CASCADE


class Teams(models.Model):

    team_name = models.TextField(
        verbose_name='Name of the team', 
        blank=False, null=False,
        help_text='Provide a name for your team'
    )

    team_description = models.TextField(
        verbose_name='Describe the team', 
        blank=False, null=False,
        help_text='A short blurb about the team'
    )

    def __str__(self):
        return __class__.__name__

    class Meta:
        pass


class Team_members(models.Model):
    '''
        Team members model    
    '''

    class Skill_level(ABC):
        '''
            An abstract class that helps use numberical skill level values in a more readable way.
            The vaiables in this class may be used in queries instead of numberical values
        '''
        JUNIOR = 1
        INTERMEDIATE = 1
        SENIOR = 3    

    #This tuple defines the choices available for the skill level field, which is a numerical value
    skillLevelChoices = (

        (Skill_level.JUNIOR, "Junior"),
        (Skill_level.INTERMEDIATE, "Intermediate"),
        (Skill_level.SENIOR, "Senior"),
    )

    #====== FIELDS ==========================

    first_name = models.TextField(
        verbose_name="First name", 
        blank=False, 
        null=False
    )

    surname = models.TextField(
        verbose_name="Surname", 
        blank=False, 
        null=False
    )

    skill_level = models.PositiveIntegerField(
        max_length=1, 
        choices=skillLevelChoices, 
        default=Skill_level.JUNIOR
    )

    team = models.ForeignKey(
        Teams,
        verbose_name="Name of team",
        help_text="Which team does this member belong to?",
        blank=False, 
        null=False,
        on_delete=CASCADE
    )

    #===== END OF FIELDS ====================

    def __str__(self):
        return __class__.__name__

    class Meta:
        app_label = 'teamaker'
        ordering = []
        verbose_name        = "Team member"
        verbose_name_plural = "Team members"