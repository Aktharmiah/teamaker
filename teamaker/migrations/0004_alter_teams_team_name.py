# Generated by Django 3.2.6 on 2021-11-11 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teamaker', '0003_alter_teams_team_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teams',
            name='team_name',
            field=models.CharField(help_text='Provide a name for your team', max_length=200, verbose_name='Name of the team'),
        ),
    ]