import Desk from '#models/desk'
import Feature from '#models/feature'
import Room from '#models/room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class DeskSeeder extends BaseSeeder {
  async run() {
    const features = ['Écran', 'Clavier', 'Souris', 'Chaise ergonomique']
    const featureModels = await Promise.all(features.map((name) => Feature.firstOrCreate({ name })))
    const parisRoom = await Room.firstOrCreate(
      {
        name: 'paris',
      },
      {
        id: randomUUID(),
        label: 'Paris',
        x: 100,
        y: 1600,
        width: 250,
        height: 430,
        type: 'workspace',
        capacity: 9,
        description: 'Main restroom facilities',
        color: '#a29bfe',
      }
    )
    const berlinRoom = await Room.firstOrCreate(
      {
        name: 'Berlin',
      },
      {
        id: randomUUID(),
        label: 'Berlin',
        x: 290,
        y: 1570,
        width: 360,
        height: 430,
        type: 'workspace',
        capacity: 18,
        description: 'Creative space for brainstorming and ideation sessions',
        color: '#ffcccc',
      }
    )

    const vienneRoom = await Room.firstOrCreate(
      {
        name: 'Vienne',
      },
      {
        id: randomUUID(),
        label: 'Vienne',
        x: 655,
        y: 1635,
        width: 250,
        height: 360,
        type: 'workspace',
        capacity: 9,
        description: 'Central meeting point for team discussions',
        color: 'orange',
      }
    )
    const helsinkiRoom = await Room.firstOrCreate(
      {
        name: 'Helsinki',
      },
      {
        id: randomUUID(),
        label: 'Helsinki',
        x: 710,
        y: 1150,
        width: 180,
        height: 255,
        type: 'private',
        capacity: 1,
        description: 'Private space for focused work or 1:1 meetings',
        color: '#e6e6e6',
      }
    )
    const dublinRoom = await Room.firstOrCreate(
      {
        name: 'Dublin',
      },
      {
        id: randomUUID(),
        label: 'Dublin',
        x: 140,
        y: 650,
        width: 320,
        height: 170,
        type: 'workspace',
        capacity: 2,
        description: 'Large meeting room for team discussions',
        color: '#0984e3',
      }
    )
    const athenesRoom = await Room.firstOrCreate(
      {
        name: 'Athenes',
      },
      {
        id: randomUUID(),
        label: 'Athenes',
        x: 140,
        y: 475,
        width: 320,
        height: 170,
        type: 'workspace',
        capacity: 4,
        description: 'Large meeting room for team discussions',
        color: '#0984e3',
        position: 'bottom-0 left-1/4',
      }
    )
    const madridRoom = await Room.firstOrCreate(
      {
        name: 'Madrid',
      },
      {
        id: randomUUID(),
        label: 'Madrid',
        x: 460,
        y: 1150,
        width: 240,
        height: 400,
        type: 'meeting',
        capacity: 15,
        description: 'Large meeting room for team discussions',
        color: '#0984e3',
      }
    )
    const hanovreRoom = await Room.firstOrCreate(
      {
        name: 'Hanovre',
      },
      {
        id: randomUUID(),
        label: 'Hanovre',
        x: 300,
        y: 850,
        width: 150,
        height: 120,
        type: 'meeting',
        capacity: 4,
        description: 'Large meeting room for team discussions',
        color: '#0984e3',
      }
    )
    const grenadeRoom = await Room.firstOrCreate(
      {
        name: 'Grenade',
      },
      {
        id: randomUUID(),
        label: 'Grenade',
        x: 320,
        y: 335,
        width: 150,
        height: 120,
        type: 'meeting',
        capacity: 4,
        description: 'Large meeting room for team discussions',
        color: '#0984e3',
      }
    )
    const desks = [
      // Paris
      {
        id: randomUUID(),
        name: 'Paris 1',
        x: 147,
        y: 1632,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 2',
        type: 'openspace',
        x: 183,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 3',
        type: 'openspace',
        x: 183,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 4',
        type: 'openspace',
        x: 183,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 5',
        type: 'openspace',
        x: 183,
        y: 1918,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 6',
        type: 'openspace',
        x: 104,
        y: 1918,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 7',
        type: 'openspace',
        x: 104,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 8',
        type: 'openspace',
        x: 104,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Paris 9',
        type: 'openspace',
        x: 104,
        y: 1710,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: parisRoom.id,
      },
      // Berlin
      {
        id: randomUUID(),
        name: 'Berlin 1',
        type: 'openspace',
        x: 358,
        y: 1632,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 2',
        type: 'openspace',
        x: 512,
        y: 1632,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 3',
        type: 'openspace',
        x: 552,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 4',
        type: 'openspace',
        x: 552,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 5',
        type: 'openspace',
        x: 552,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 6',
        type: 'openspace',
        x: 552,
        y: 1915,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 7',
        type: 'openspace',
        x: 470,
        y: 1915,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 8',
        type: 'openspace',
        x: 470,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 9',
        type: 'openspace',
        x: 470,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 10',
        type: 'openspace',
        x: 470,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 11',
        type: 'openspace',
        x: 396,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 12',
        type: 'openspace',
        x: 396,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 13',
        type: 'openspace',
        x: 396,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 14',
        type: 'openspace',
        x: 396,
        y: 1915,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 15',
        type: 'openspace',
        x: 320,
        y: 1918,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 16',
        type: 'openspace',
        x: 320,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 17',
        type: 'openspace',
        x: 320,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Berlin 18',
        type: 'openspace',
        x: 320,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: berlinRoom.id,
      },
      // Vienne
      {
        id: randomUUID(),
        name: 'Vienne 1',
        type: 'openspace',
        x: 725,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 2',
        type: 'openspace',
        x: 725,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 3',
        type: 'openspace',
        x: 725,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 4',
        type: 'openspace',
        x: 725,
        y: 1918,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 5',
        type: 'openspace',
        x: 810,
        y: 1918,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 6',
        type: 'openspace',
        x: 810,
        y: 1848,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 7',
        type: 'openspace',
        x: 810,
        y: 1778,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Vienne 8',
        type: 'openspace',
        x: 810,
        y: 1708,
        description: 'Bureau équipé : écran, clavier, souris, chaise ergonomique',
        roomId: vienneRoom.id,
      },
      // Helsinki
      {
        id: randomUUID(),
        name: 'Helsinki 1',
        type: 'DG',
        x: 730,
        y: 1220,
        description: 'Bureau de direction avec équipements premium',
        roomId: helsinkiRoom.id,
      },
      // Dublin
      {
        id: randomUUID(),
        name: 'Dublin 1',
        type: 'RH',
        x: 404,
        y: 682,
        description: 'Bureau RH : poste équipé pour entretiens et administration',
        roomId: dublinRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Dublin 2',
        type: 'RH',
        x: 404,
        y: 767,
        description: 'Bureau RH : poste équipé pour entretiens et administration',
        roomId: dublinRoom.id,
      },
      // Athènes
      {
        id: randomUUID(),
        name: 'Athenes 1',
        type: 'Comex',
        x: 202,
        y: 497,
        description: 'Bureau Comex : poste senior avec connectique complète',
        roomId: athenesRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Athenes 2',
        type: 'Comex',
        x: 292,
        y: 497,
        description: 'Bureau Comex : poste senior avec connectique complète',
        roomId: athenesRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Athenes 3',
        type: 'Comex',
        x: 286,
        y: 604,
        description: 'Bureau Comex : poste senior avec connectique complète',
        roomId: athenesRoom.id,
      },
      {
        id: randomUUID(),
        name: 'Athenes 4',
        type: 'Comex',
        x: 367,
        y: 604,
        description: 'Bureau Comex : poste senior avec connectique complète',
        roomId: athenesRoom.id,
      },
    ]

    for (const deskData of desks) {
      const desk = await Desk.firstOrCreate({ id: deskData.id }, deskData)
      await desk.related('features').sync(featureModels.map((f) => f.id))
    }
  }
}
