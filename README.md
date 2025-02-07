# Gateway MS

## DEV

1. Instalar dependencias
2. Crear archivo `.env` basado en el `.env.template`
3. Asegurarse tener correindo los demas microservicios
4. Ejecutar `npm run dev`

## NATS

Para ejcutarlo en Docker el servidor nats
`docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats`

## PROD

Para la imagen en Producion ejecutar:
```
  docker build -f dockerfile.prod -t client-gateway .
```
PRUEBA