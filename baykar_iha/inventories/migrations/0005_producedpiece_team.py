# Generated by Django 4.2 on 2024-11-03 17:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('inventories', '0004_alter_producedpiece_airplane'),
    ]

    operations = [
        migrations.AddField(
            model_name='producedpiece',
            name='team',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='auth.group'),
        ),
    ]
