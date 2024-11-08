# Generated by Django 4.2 on 2024-11-03 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventories', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='airplane',
            old_name='model',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='airplane',
            name='assembled',
        ),
        migrations.RemoveField(
            model_name='airplane',
            name='parts',
        ),
        migrations.RemoveField(
            model_name='piece',
            name='units_in_stock',
        ),
        migrations.RemoveField(
            model_name='producedpiece',
            name='team',
        ),
        migrations.CreateModel(
            name='ProducedAirplane',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('produced_date', models.DateField(auto_now_add=True)),
                ('status', models.BooleanField(default=True)),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventories.airplane')),
                ('parts', models.ManyToManyField(blank=True, related_name='produced_airplanes', to='inventories.producedpiece')),
            ],
        ),
    ]
