Liste des commandes :

Si modification du fichier .service

sudo systemctl stop facture-backend
sudo cp /home/louis/Documents/facture-backend/service/facture-backend.service /etc/systemd/system 
sudo systemctl daemon-reload 
sudo systemctl start facture-backend

Sinon 

sudo systemctl restart facture-backend
