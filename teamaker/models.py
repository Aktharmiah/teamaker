#abstract base class
from abc import ABC
from django.db import models
from django.db.models.deletion import CASCADE

from django.contrib.auth.models import AbstractUser


class Teams(models.Model):

    team_name = models.CharField(
        verbose_name='Name of the team', 
        blank=False, null=False,
        max_length=200,
        help_text='Provide a name for your team'
    )

    team_description = models.TextField(
        verbose_name='Describe the team', 
        blank=False, null=False,
        help_text='A short blurb about the team'
    )

    def __str__(self):
        return self.team_name

    class Meta:
        pass


class User( AbstractUser ):
    '''
        Team members model    
    '''
    
    class Skill_level(ABC):
        '''
            An abstract class that helps use numberical skill level values in a more readable way.
            The vaiables in this class may be used in queries instead of numberical values
        '''
        JUNIOR = 1
        INTERMEDIATE = 2
        SENIOR = 3    

    #This tuple defines the choices available for the skill level field, which is a numerical value
    skillLevelChoices = (

        (Skill_level.JUNIOR, "Junior"),
        (Skill_level.INTERMEDIATE, "Intermediate"),
        (Skill_level.SENIOR, "Senior"),
    )

    #====== FIELDS ==========================

    USERNAME_FIELD  = 'email'
    EMAIL_FIELD     = 'email'
    REQUIRED_FIELDS =  ['first_name']

    email           = models.EmailField(verbose_name='email address', unique=True)
    username        = models.CharField(max_length=1, help_text='Not used', default='', unique=False, null=True, blank=True)


    skill_level = models.PositiveIntegerField(
        choices=skillLevelChoices, 
        default=Skill_level.JUNIOR
    )

    # team = models.ForeignKey(
    #     Teams,
    #     verbose_name="Name of team",
    #     help_text="Which team does this member belong to?",
    #     blank=False, 
    #     null=False,
    #     on_delete=CASCADE
    # )

    #===== END OF FIELDS ====================

    def __str__(self):
        return __class__.__name__

    class Meta:
        app_label = 'teamaker'
        ordering = []
        verbose_name        = "Team member"
        verbose_name_plural = "Team members"