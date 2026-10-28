const list: [name: string, description: string, icon: string, issues: string[]][] = [
  ['Plumbing', 'Repairs, installations, leaks and water systems.', 'Wrench', ['Leaking tap or pipe', 'Blocked drain or toilet', 'Water heater / geyser', 'Water pump or motor', 'Tank cleaning or repair', 'New fitting installation']],
  ['Electrical', 'Safe electrical repairs, fittings and installations.', 'Zap', ['Power fault or tripping', 'Wiring or rewiring', 'Lights and fans', 'Sockets and switches', 'DB board / breakers', 'Generator or inverter hookup']],
  ['Air Conditioning', 'AC servicing, repairs and new installations.', 'Wind', ['AC service and cleaning', 'Not cooling', 'Gas refill', 'Water leaking from unit', 'New AC installation', 'AC relocation']],
  ['Painting', 'Interior and exterior painting for every space.', 'Paintbrush', ['Interior walls', 'Exterior walls', 'Single room touch-up', 'Wood or metal painting', 'Damp or peeling paint']],
  ['Carpentry', 'Doors, cabinets, furniture and wood repairs.', 'Hammer', ['Door repair or fitting', 'Cabinets and wardrobes', 'Furniture repair', 'Locks and hinges', 'Custom woodwork']],
  ['Masonry', 'Masonry repairs, walls, tiling and finishes.', 'Blocks', ['Wall cracks or repair', 'Tiling', 'Plastering', 'Small building work', 'Paving']],
  ['Roofing', 'Roof inspections, repairs and rainwater systems.', 'House', ['Roof leak', 'Broken tiles or sheets', 'Gutters and downpipes', 'Ceiling repair', 'Roof inspection']],
  ['Cleaning', 'Reliable home and office deep cleaning.', 'Sparkles', ['Deep house cleaning', 'Office cleaning', 'Move-in / move-out clean', 'Sofa and carpet cleaning', 'After-construction clean']],
  ['Gardening', 'Garden care, landscaping and outdoor upkeep.', 'Trees', ['Lawn mowing', 'Hedge and tree trimming', 'Garden clean-up', 'Landscaping', 'Regular garden care']],
  ['Pest Control', 'Practical treatment plans for common pests.', 'Bug', ['Termites', 'Cockroaches and ants', 'Rats and mice', 'Mosquito treatment', 'Bed bugs']],
  ['Appliance Repair', 'Diagnosis and repairs for household appliances.', 'Refrigerator', ['Washing machine', 'Refrigerator or freezer', 'Microwave or oven', 'Water dispenser', 'Other appliance']],
  ['Flooring', 'Tile, timber and other flooring repairs.', 'Grid2X2', ['Tile repair or replacement', 'Timber flooring', 'Floor polishing', 'New flooring']],
  ['Welding', 'Metal gates, grills and structural fabrication.', 'Flame', ['Gate repair', 'Window grills', 'Railings and staircases', 'Steel fabrication']],
  ['Glass & Aluminum', 'Windows, doors, partitions and glass repairs.', 'PanelsTopLeft', ['Broken glass', 'Sliding door or window', 'Shower partition', 'Aluminium fabrication']],
  ['Waterproofing', 'Leak prevention for roofs, bathrooms and walls.', 'Droplets', ['Roof slab leak', 'Bathroom leak', 'Wall dampness', 'Water tank waterproofing']],
  ['Solar Systems', 'Solar panel cleaning, inspection and maintenance.', 'Sun', ['Panel cleaning', 'System inspection', 'Inverter issue', 'Low power output']],
  ['Building Maintenance', 'Planned upkeep and repairs for properties.', 'Building2', ['Maintenance plan', 'General repairs', 'Common area upkeep', 'Inspection report']],
  ['Office Maintenance', 'One point of contact for workplace repairs.', 'BriefcaseBusiness', ['Electrical and lighting', 'Partitions and furniture', 'AC and ventilation', 'Regular maintenance plan']],
  ['Moving & Handyman', 'Small installations, mounting and moving help.', 'PackageCheck', ['TV or shelf mounting', 'Furniture assembly', 'Moving help', 'Curtain rails and fittings', 'Small odd jobs']],
  ['Pool Maintenance', 'Pool cleaning, equipment checks and upkeep.', 'Waves', ['Pool cleaning', 'Water treatment', 'Pump or filter check', 'Regular pool care']],
];

export const services = list.map(([name, description, icon, issues], i) => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  name,
  description,
  icon,
  issues,
  group: i < 7 ? 'Repairs' : i < 14 ? 'Home care' : 'Property care',
}));

export type Service = (typeof services)[number];
