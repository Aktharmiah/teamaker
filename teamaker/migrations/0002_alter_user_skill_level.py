# Generated by Django 3.2.6 on 2021-11-11 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teamaker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='skill_level',
            field=models.PositiveIntegerField(choices=[(1, 'Junior'), (2, 'Intermediate'), (3, 'Senior')], default=1, max_length=1),
        ),
    ]
