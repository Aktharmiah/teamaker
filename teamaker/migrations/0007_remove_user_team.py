# Generated by Django 3.2.6 on 2021-11-15 02:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teamaker', '0006_alter_user_skill_level'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='team',
        ),
    ]